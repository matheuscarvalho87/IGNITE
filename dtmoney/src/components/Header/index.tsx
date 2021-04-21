import logoImg from '../../assets/logo.svg'
import {Container,Content} from './styles'

interface HeaderProps{
  //função nao recebe nenhum parametro e nao tem retorno
  onOpenNewTransactionModal:()=>void;
}

export function Header({onOpenNewTransactionModal}:HeaderProps){
  
  return(
    <Container>
      <Content>
      <img src={logoImg} alt="dt money"/>
       <button type="button" onClick={onOpenNewTransactionModal}>
         Nova transação
       </button>
      </Content>
    </Container>
  )
}