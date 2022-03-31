import Routers from './routers';
import { Body} from './style';
import {Provider} from 'react-redux';
import Store from './redux/store';
import SocketContext from './context/SocketContext'
import './styles/global.css';
function App() {
  return (
    <SocketContext>
        <Provider store={Store}>
          <Body className="scroll">
            <Routers/>
          </Body>
        </Provider>
    </SocketContext>
    
    
  );
}

export default App;
