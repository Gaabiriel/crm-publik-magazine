﻿namespace Common.DTO
{
    public class SignUpDTO : LoginDTO
    {
        public string FullName { get; set; }
        public string ConfirmPassword { get; set; }
    }
}