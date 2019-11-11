import React, {useState} from 'react';
import client from '../client';
import {withRouter, Link} from 'react-router-dom';
import {Input,Icon,Button} from 'antd';
import './SignUp.css';

const Wrapper = withRouter(({history})=>{
   return <SignUp history={history} />
})

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const signUp = () => {
        client.signUp(username, email, pass).then(res=>{
            if(!res.ack){
                alert('error signing up');
                return;
            }

            props.history.push('/');
        })
    }

    return (
        <div className="sign-up">
            <h4>Sign Up</h4>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} className="input" type="text" name="Username" value={username} placeholder="Username" onChange={(e)=> setUsername(e.target.value)} /><br />
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} className="input" type="email" name="Email" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)} /><br />
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} className="input" type="password" name="Password" value={pass} placeholder="Password" onChange={(e)=> setPass(e.target.value)} /><br /> 
            <p>Already have an account? <Link to="/">Sign in here</Link> </p>
            <Button className="button" type="primary" onClick={signUp}>Sign Up</Button>
        </div>
    );
}

export default Wrapper;