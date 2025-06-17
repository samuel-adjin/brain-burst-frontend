variable "stack_name" {
  description = "Unique name prefix for resources"
  type        = string
  default     = "cloudcomputingproject"
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}
