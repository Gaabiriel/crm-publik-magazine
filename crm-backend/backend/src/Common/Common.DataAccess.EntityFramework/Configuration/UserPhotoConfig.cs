using Common.DataAccess.EntityFramework.Configuration.System;
using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration
{
    public class UserPhotoConfig : BaseEntityConfig<UserPhoto>
    {
        public UserPhotoConfig() : base("UserPhotos")
        {
            Property(obj => obj.Image).HasColumnName("Image").IsRequired();
        }
    }
}
