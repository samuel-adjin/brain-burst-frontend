provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "react_bucket" {
  bucket        = "cloudcomputing-react-app-build"
  force_destroy = true
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild-react-app-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "codebuild.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codebuild_policy" {
  role = aws_iam_role.codebuild_role.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:us-east-1:963540292791:log-group:/aws/codebuild/react-app-build*"
      },
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = [
          # Add the artifact store bucket for CodeBuild to read from
          aws_s3_bucket.react_bucket.arn,
          "${aws_s3_bucket.react_bucket.arn}/*",
          # Keep the existing deployment bucket permissions
          "arn:aws:s3:::cloudcomputingproject-bucket-fe822512",
          "arn:aws:s3:::cloudcomputingproject-bucket-fe822512/*",
          "arn:aws:s3:::cloudcomputingproject-bucket-3f109847",  # <-- Add this
          "arn:aws:s3:::cloudcomputingproject-bucket-3f109847/*" # <-- And this
        ]
      },
      {
        Effect = "Allow",
        Action = [
          "cloudfront:CreateInvalidation"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_codebuild_project" "react_build" {
  name          = "react-app-build"
  description   = "Build React app and deploy to S3"
  build_timeout = 20
  service_role  = aws_iam_role.codebuild_role.arn

  artifacts {
    type      = "S3"
    location  = aws_s3_bucket.react_bucket.bucket
    packaging = "ZIP"
    name      = "build_output.zip"
    path      = "dist"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/standard:7.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "S3_BUCKET"
      value = "cloudcomputingproject-bucket-3f109847" # Updated to deployment bucket
    }
    environment_variable {
      name  = "VITE_USER_POOL_ID"
      value = "us-east-1_pvM3zNikE"
    }
    environment_variable {
      name  = "VITE_USER_POOL_CLIENT_ID"
      value = "7skda7k67apl80m5uel6b3aa1t"
    }
    environment_variable {
      name  = "VITE_BACKEND_URL"
      value = "https://23s0ozenh5.execute-api.us-east-1.amazonaws.com/dev/"
    }
  }

  source {
    type     = "GITHUB"
    location = "https://github.com/Cardinal4Real/brain-burst-frontend.git"
    #location  = "https://github.com/Cardinal4Real/finalprojtest.git"
    buildspec = "buildspec.yml"
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name = "codepipeline-react-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "codepipeline.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  role = aws_iam_role.codepipeline_role.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:GetBucketVersioning",
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject",
          "s3:PutObjectAcl"
        ],
        Resource = [
          aws_s3_bucket.react_bucket.arn,
          "${aws_s3_bucket.react_bucket.arn}/*",
          "arn:aws:s3:::cloudcomputingproject-bucket-3f109847",
          "arn:aws:s3:::cloudcomputingproject-bucket-3f109847/*"
        ]
      },
      {
        Effect = "Allow",
        Action = [
          "codebuild:BatchGetBuilds",
          "codebuild:StartBuild"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_codepipeline" "react_pipeline" {
  name     = "react-app-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.react_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]
      configuration = {
        Owner      = "Cardinal4Real"
        Repo       = "brain-burst-frontend"
        Branch     = "main"
        OAuthToken = var.github_token
      }
    }
  }

  stage {
    name = "Build"
    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"] # <-- THIS LINE IS ESSENTIAL FOR THE DEPLOY STAGE
      version          = "1"
      configuration = {
        ProjectName = aws_codebuild_project.react_build.name
      }
    }
  }

  stage {
    name = "Deploy"
    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "S3"
      input_artifacts = ["build_output"]
      version         = "1"
      configuration = {
        BucketName = "cloudcomputingproject-bucket-3f109847"
        Extract    = "true"
      }
    }
  }
}
