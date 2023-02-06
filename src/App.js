import { Suspense } from 'react';
import { FetchData } from './components/hooks/FetchUsers';
import { Spinner } from './components/loaders/Spinner';





function App() {
  const resource = FetchData();

  return (
      <Suspense fallback={<Spinner />}>
        <UserDetails resource={resource} />
      </Suspense>
  );
}

export default App;




const UserDetails =  ({resource}) => {
 
  const users = resource.user.read();
  return(
    <>
      {users.map(user => (
        <section 
        key={user?.id}
        style={{ 
          marginTop: '50px', 
          width: '100%', 
          textAlign: 'center' 
          }}
        >
            <p> Id: { user?.id } </p>
            <p> Name: { user?.name } </p>
            <p> Username: { user?.username } </p>
            <p> Email: { user?.email } </p>
            <p> City: { user?.address?.city } </p>
        </section>
      ))}
    </>
  );
};