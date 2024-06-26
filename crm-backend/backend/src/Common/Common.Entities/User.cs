﻿using System.Collections.Generic;

namespace Common.Entities
{
    public class User : DeletableEntity
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public int? Age { get; set; }

        public string AddressStreet { get; set; }
        public string AddressCity { get; set; }
        public string AddressZipCode { get; set; }
        public double? AddressLat { get; set; }
        public double? AddressLng { get; set; }
        public string TelefoneFixo { get; set; }
        public string Celular { get; set; }
        public string Regiao { get; set; }
        public virtual UserPhoto Photo { get; set; }
        public virtual Settings Settings { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<UserClaim> Claims { get; set; } 

    }
}
