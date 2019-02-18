
import features_json from './features_mock.json'; 
import { READ_FEATURES } from '../actions/features_action';

function features(state = features_json, action) {
    switch(action.type) {
      case READ_FEATURES:
            console.log("trying to read avaliable features");
        return state;
      default: 
        return state;
    }
  }

export default features;