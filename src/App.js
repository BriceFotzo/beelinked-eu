import './App.css';
import BeeNav from './Home/navbar'
import Foots from './Home/Foots'
import Home from './Home/homepage'
import Main from './Home/jumbo'
import Connection from './User/connexion'
import Register from './User/inscription'
import Alerte from './Alertes/src/homeAlerte'
import AllAlerte from './Alertes/src/HomeAllAlertes'
import InscriptionNAPI from './User/inscriptionNAPI'
import {BrowserRouter, Route, Switch,withRouter} from 'react-router-dom';
import PasserApiculteur from './PasserApiculteur/passerApiculteur';
import Apiculteurs from './Decouverte/apiculteurs'
import Contact from './Contact/contact'
import Commandes from './Modules/commandes'
import Sav from './Modules/sav'
import Meteo from './MesRuchers/Meteo'
import Userpage from './User/Userpage';
import PageRuche from './SelectRucher/PageRuche';
import PageRucher from './SelectRucher/PageRucher';
import Mesruches from './Management/beehouse_management/Ruches/Mesruches';
import Mesruchers from './Management/beehouse_management/Ruchers/Mesruchers';
import Materiel from './Management/materiel';
import ForumHome from './Forum/HomePage.js';
import MesRapports from './Management/hive_report/MesRapports';
import Posts from './Decouverte/postView';
import Contenus from './Decouverte/contenuView';

const ComponentToHide = (props) => {
  // console.log(JSON.parse(localStorage.getItem('userCo')).Statut)
  const { location } = props;
  if (location.pathname==="/"){
    console.log(location.pathname)
    console.log('Im in')
    // const val=JSON.parse(localStorage.getItem('userCo')) === undefined ? 0:JSON.parse(localStorage.getItem('userCo')).statut
    // console.log(val)
    return (
        <Main />
    );
  }
  else{
    return null
  }

}

const ComponentThatHides = withRouter(ComponentToHide);


function App() {
  
  return (
    <BrowserRouter>
              <header className="App-header">
                    <BeeNav connected={JSON.parse(localStorage.getItem('userCo')) === null ? 0:JSON.parse(localStorage.getItem('userCo')).statut } />
                    <ComponentThatHides/>
                </header>
                <div className="container content justify-content-center">

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/connection" component={Connection} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/AllTaches" component={AllAlerte} />
          <Route exact path="/Taches" component={Alerte} />
          <Route exact path="/inscriptionNAPI" component={InscriptionNAPI} />
          <Route exact path ="/PasserApiculteur" component={PasserApiculteur} />
          <Route exact path ="/apiculteurs" component={Apiculteurs} />
          <Route exact path ="/contact" component={Contact} />
          <Route exact path ="/commandes" component={Commandes} />
          <Route exact path ="/Userpage" component={Userpage} />
          <Route exact path ="/pageRucher/" component={PageRucher} />
          <Route exact path ="/pageRuche/:idRucher" component={PageRuche} />
          <Route exact path ="/BeehouseManagement" component ={Mesruchers}/>
          <Route exact path ="/HiveManagement" component ={Mesruches}/>
          <Route exact path = "/Rapports" component ={MesRapports} />
          <Route exact path ="/sav" component={Sav} />
          <Route exact path ="/meteo" component={Meteo} />
          <Route path ="/posts/:typePost" component={Posts} />
          <Route path ="/contenu/:typePost/:idPost" component={Contenus} />
          <Route exact path ="/materiel" component={Materiel} />
          <Route exact path ="/forum" component={ForumHome} />
        </Switch>
      </div>
<footer>
  <Foots/>
</footer>
    </BrowserRouter>
    
  );
}

export default App
