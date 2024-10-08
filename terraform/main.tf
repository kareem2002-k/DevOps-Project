provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "my_key" {
  key_name   = "my_key"
  public_key = file("~/.ssh/my_new_key.pub")
  }


resource "aws_instance" "web" {
  count         = 3
  ami           = "ami-04a81a99f5ec58529"  # Replace with your AMI ID
  instance_type = "t2.micro"
  key_name      = aws_key_pair.my_key.key_name

  tags = {
    Name = "Kareem-${count.index}"
  }
}
