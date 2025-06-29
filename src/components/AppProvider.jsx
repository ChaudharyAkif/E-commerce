import AuthContext from '../context/Auth'

function AppProvider({children}) {

  return (
    <AuthContext>
    {children}
    </AuthContext>
  )
}

export default AppProvider