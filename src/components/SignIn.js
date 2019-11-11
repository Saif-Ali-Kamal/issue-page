import React, {useState} from 'react';
import client from '../client';
import {withRouter, Link} from 'react-router-dom';
import {Input,Icon,Button} from 'antd';
import './SignIn.css';

const Wrapper = withRouter(({history})=>{
   return <SignIn history={history} />
})

const SignIn = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const signIn = () => {
        client.signIn(username, pass).then(res=>{
            if(!res.ack){
                alert('error logging in');
                return;
            }

            props.history.push('/issue');
        })
    }

    return (
        <div className="sign-in">
            <h4>Sign In</h4>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} className="input" type="text" name="Username" value={username} placeholder="username" onChange={(e)=> setUsername(e.target.value)} /><br />
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} className="input" type="password" name="Password" value={pass} placeholder="Password" onChange={(e)=> setPass(e.target.value)} />
            <p>don't have account? <Link to="/sign-up">Sign up here</Link></p>
            <Button className="button" type="primary" onClick={signIn}>Sign In</Button>
        </div>
    );
}

export default Wrapper;