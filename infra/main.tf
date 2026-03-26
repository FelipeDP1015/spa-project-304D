provider "aws" {
    region = "us-east-1"
}

resource "aws_security_group" "web_sg" {
  name = "spa"

  ingress{
    #el puerto 80 es el http
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress{
    # el puerto 22 es el SSH
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "spa_server" {
    #Ubuntu
  ami = "ami-0c02fb55956c7d316"
  instance_type = "t2.micro"

  key_name = "spa-key"

  security_groups = [aws_security_group.web_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install nginx -y
              sistemctl start nginx
              sistemctl enable nginx
              EOF
    tags = {
        name = "spa-frontend"
    }
}

output "public_ip" {
  value = aws_instance.spa_server.public_ip
}
