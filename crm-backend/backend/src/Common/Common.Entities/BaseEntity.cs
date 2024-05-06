using System;

namespace Common.Entities
{
    public abstract class BaseEntity
    {
        public virtual int Id { get; set; }
        //public virtual DateTime CreatedDate { get; set; }
        //public virtual DateTime ModifiedDate { get; set; }
    }
}
