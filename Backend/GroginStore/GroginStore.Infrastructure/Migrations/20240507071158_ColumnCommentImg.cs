using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroginStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ColumnCommentImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CommentImg",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentImg",
                table: "Comments");
        }
    }
}
