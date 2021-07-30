import Routers from './routers';
import { Body} from './style';
import {Provider} from 'react-redux';
import Store from './redux/store'
function App() {
  return (
    <Provider store={Store}>
        <Body className="scroll">
          <Routers/>
        </Body>
    </Provider>
    
  );
}

export default App;
