using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SU.Domain.Models
{
    public partial class StackUnderflowContext : DbContext
    {
        public StackUnderflowContext()
        {
        }

        public StackUnderflowContext(DbContextOptions<StackUnderflowContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserPost> UserPosts { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-12NGJ7T;Initial Catalog=StackUnderflow;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.CommentContent)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.CommentDate).HasColumnType("datetime");

                entity.Property(e => e.CommenterName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.HashPassword).IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RegisterDate).HasColumnType("datetime");

                entity.Property(e => e.UserEmail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.UserName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<UserPost>(entity =>
            {
                entity.ToTable("UserPost");

                entity.Property(e => e.Header)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Image).HasColumnType("image");

                entity.Property(e => e.MainContent)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.PostDate).HasColumnType("datetime");

                entity.Property(e => e.PosterName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
