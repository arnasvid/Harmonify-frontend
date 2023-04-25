import { handleLogin, getStatus } from './store/common/commonActions'
import { store } from './store/rootReducer'

const common = {
    handleLogin : (isUserLoggedIn: boolean) => store.dispatch(handleLogin(isUserLoggedIn)),
    getStatus : () => store.dispatch(getStatus()),
}

export default common;