using System.Security.Claims;
using API.Dtos;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly TokenService _tokenService;

		public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
		{
			_userManager = userManager;
			_tokenService = tokenService;
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
		{
			var user = await _userManager.FindByEmailAsync(loginDto.Email);
			if (user is null) return Unauthorized();

			var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
			if (!isPasswordCorrect) return Unauthorized();

			return Ok(CreateUserDto(user));
		}

		[AllowAnonymous]
		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
		{
			var hasUserWithUsername = await _userManager.Users.AnyAsync(user => user.UserName == registerDto.Username);
			if (hasUserWithUsername)
			{
				ModelState.AddModelError("username", "Username is already taken");
				return ValidationProblem();
			}

			var hasUserWithEmail = await _userManager.Users.AnyAsync(user => user.Email == registerDto.Email);
			if (hasUserWithEmail)
			{
				ModelState.AddModelError("email", "Email is already taken");
				return ValidationProblem();
			}

			var user = new AppUser
			{
				DisplayName = registerDto.DisplayName,
				Email = registerDto.Email,
				UserName = registerDto.Username,
			};

			var result = await _userManager.CreateAsync(user, registerDto.Password);
			if (!result.Succeeded) return BadRequest(result.Errors);

			return Ok(CreateUserDto(user));
		}

		[HttpGet]
		public async Task<ActionResult<UserDto>> GetCurrentUser()
		{
			var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
			return Ok(CreateUserDto(user));
		}

		private UserDto CreateUserDto(AppUser user)
		{
			return new UserDto
			{
				DisplayName = user.DisplayName,
				Image = null,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName
			};
		}
	}
}