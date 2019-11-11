import React, {useState, useEffect} from 'react';
import client from '../client';
import {Link} from 'react-router-dom';
import {Input,Button} from 'antd'; 
import './Issue.css';

const Issue = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

    useEffect(() =>{
        const subscription = client.getIssue((err, issues) => {
            if(err){
                alert(err);
                return;
            }
            setList(issues);
        })
        return subscription.unsubscribe;
    }, []);

    const addIssue = () => {
        client.addIssue(value).then(res =>{
            if(!res.ack){
                alert('could not add issue');
                return;
            }

            setValue('');
        })
    }

    const deleteIssue = (id) => {
        client.deleteIssue(id).then(res => {
            if(!res.ack){
                alert('could not delete issue');
                return;
            }
        })
    }

    const updateIssue = (issue) => {
        client.updateIssue(issue._id, !issue.opened).then(res => {
            if(!res.ack){
                alert('could not update issue');
                return;
            }
        })
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            addIssue()
        }
    }


    return (
        <div>
            <Button type="primary"><Link to="/">Log out</Link></Button>
            <h3>Add Issue: </h3>
            <Input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleEnter} />
            <Button className="button" type="primary" onClick={addIssue} disabled={!value}>Add</Button>
            <div>
                {list.map(item => (
                    <div key={item._id}>
                    <h1><Link to={"/issue/" + item._id}>{item.value}</Link>
                    <Button className="button-right" type="danger" onClick={() => deleteIssue(item._id)}>X</Button>
                    <Button className="button-right"  type="primary" onClick={() => updateIssue(item)}>close</Button></h1>
                    </div>
                ))}
            </div>
        </div>

    )


}

export default Issue;