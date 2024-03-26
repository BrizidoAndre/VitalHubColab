using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository;
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medicoRepository.ListarTodos());
        }

        [Authorize]
        [HttpPut]
        public IActionResult AtualizarPerfil(MedicoViewModel medico)
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(_medicoRepository.AtualizarPerfil(idUsuario, medico));
        }


        [HttpPost("Cadastrar")]
        public IActionResult CadastrarMedico(MedicoViewModel medicoModel)
        {
            try
            {

            Usuario user = new Usuario();

            user.TipoUsuarioId = medicoModel.IdTipoUsuario;
            user.Nome = medicoModel.Nome;
            user.Senha = medicoModel.Senha;
            user.Email = medicoModel.Email;
            user.Foto = medicoModel.Foto;

            user.Medico = new Medico();

            user.Medico.EspecialidadeId = medicoModel.EspecialidadeId;
            user.Medico.Crm = medicoModel.Crm;


            _medicoRepository.Cadatrar(user);

            return Ok("teste");
            
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
