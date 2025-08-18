import { useState, useEffect } from 'react'
// Imports para criação de tabela
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
// TableHead é onde colocamos os titulos
import TableHead from '@mui/material/TableHead';
// TableBody é onde colocamos o conteúdo
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import api from '../axios/axios'
import { Button, IconButton, Alert, Snackbar } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCriarIngresso from '../components/ModalCriarIngresso';

function listEventos() {
  const [events,setEventos] = useState([]);
  const [alert, setAlert] = useState({
    //Visibilidade (false = oculta; true = visível )
    open: false,

    //Nível do alerta (sucess, error, warning, etc)
    severity:"",

    //Mensagem que será exibida
    message:""
  });

  //Função para exibir o alerta 
  const showAlert = (severity, message) => {
    setAlert({open: true, severity, message})
  };

  //fechar o alerta
  const handleCloseAlert = () => {
    setAlert({...alert, open:false})
  };

  const navigate = useNavigate();

  async function getEventos(){
    // Chamada da Api
    await api.getEventos().then(
      (response)=>{
        console.log(response.data.events)
        setEventos(response.data.events)
      },(error)=>{
        console.log("Erro ",error)
      }
    )
  }

  async function deleteEventos(id){
    try{
      await api.deleteEventos(id);
      await getEventos();
      showAlert("success", "Evento excluído com sucesso!")
    }catch(error){
      console.log("Erro ao deletar evento...", error);
      showAlert("error", error.response.data.error);

    }
  }

  const listEventos = events.map((evento)=>{
    return(
      <TableRow key={evento.id_evento}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
        <TableCell align="center">{evento.fk_id_organizador}</TableCell>
        <TableCell>
          <img 
          src={`http://localhost:5000/api/v1/evento/imagem/${evento.id_evento}`}
          alt="Imagem do evento"
          style={{width:"80px", height:"80px", objectFit:"cover"}}
          />
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={() => deleteEventos(evento.id)}>
            <DeleteOutlineIcon color="error"/>
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(evento)}>
            Adicionar 
          </IconButton>
        </TableCell>


      </TableRow>
    )
  });

  function logout(){
    localStorage.removeItem("authenticated");
    navigate("/")
  }

  useEffect(()=>{getEventos();},[]);

const [eventoSelecionado, setEventoSelecionado] = useState("");
const [modalOpen, setModalOpen] = useState(false);

const abrirModalIngresso = (evento) => {
  setEventoSelecionado(evento);
  setModalOpen(true);
};

const fecharModalIngresso = () => {
  setModalOpen(false);
  setEventoSelecionado("");
};


  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}
      anchorOrigin={{vertical:"top", horizontal:"center"}}>
        <Alert onClose={handleCloseAlert}
        severity={alert.severity} 
        sx={{width:"100%"}}>
          {alert.message}
        </Alert>

      </Snackbar>

      <ModalCriarIngresso
  open={modalOpen}
  onClose={fecharModalIngresso}
  eventoSelecionado={eventoSelecionado}
/>

      {events.length === 0 ?(<h1>Carregando eventos</h1>): (
      <div>
        <h5>Lista de Eventos</h5>
        <TableContainer component={Paper} style={{margin:"2px"}}>
          <Table size="small">
            <TableHead style={{backgroundColor: "lightskyblue", borderStyle:"solid"}}>
              <TableRow>
                <TableCell align="center">
                  Nome
                </TableCell>
                <TableCell align="center">
                  Descrição
                </TableCell>
                <TableCell align="center">
                  Data hora
                </TableCell>
                <TableCell align="center">
                  Local
                </TableCell>
                <TableCell align="center">
                  Id Organizador
                </TableCell>
                <TableCell align="center">
                  Imagem
                </TableCell>
                <TableCell align="center">
                  Excluir
                </TableCell>
                <TableCell align="center">
                  Criar ingresso
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listEventos}</TableBody>
          </Table>
        </TableContainer>
      <Button
      fullWidth
      variant='contained'
      onClick={logout}
      >
        SAIR
      </ Button>
      </div>
      )}
    </div>
  )
}
export default listEventos