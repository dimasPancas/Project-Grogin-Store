using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroginStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addRatingToCommentTabl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Wishlists");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Comments",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Comments");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Wishlists",
                type: "int",
                nullable: true);
        }
    }
}
