using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroginStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTableVoucherColumnOrderId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_Orders_OrderId",
                table: "Vouchers");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderId",
                table: "Vouchers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_Orders_OrderId",
                table: "Vouchers",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_Orders_OrderId",
                table: "Vouchers");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderId",
                table: "Vouchers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_Orders_OrderId",
                table: "Vouchers",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
