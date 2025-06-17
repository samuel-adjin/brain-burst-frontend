output "bucket_name" {
  value = aws_s3_bucket.react_bucket.bucket
}

output "codepipeline_name" {
  value = aws_codepipeline.react_pipeline.name
}
