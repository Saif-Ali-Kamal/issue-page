import React, {useState, useEffect} from 'react';
import client from '../client';
import {useParams} from 'react-router-dom';
import {Button,Input} from 'antd';
import './Comment.css';

const { TextArea } = Input;

const Comment = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

    let {id} = useParams();
    useEffect(() =>{
        const subscription = client.getComment((err, comments) => {
            if(err){
                alert(err);
                return;
            }
            setList(comments);
        })
        return subscription.unsubscribe;
    }, []);

    const addComment = () => {
        client.addComment(value, id).then(res =>{
            if(!res.ack){
                alert('could not add issue');
                return;
            }

            setValue('');
        })
    }

    const deleteComment = (id) => {
        client.deleteComment(id).then(res => {
            if(!res.ack){
                alert('could not delete issue');
                return;
            }
        })
    }

    const updateComment = (comment) => {
        client.updateComment(comment._id, value).then(res => {
            if(!res.ack){
                alert('could not update issue');
                return;
            }
            setValue('');
        })
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            addComment()
        }
    }

    const commentFilter = list.filter(comment => {
        return comment.issueId === id;
    })


    return (
        <div>
            <h3>Add Comment: </h3>
            <TextArea className="text-area" rows="4" type="text"  value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleEnter} />
            <Button className="button" type="primary" onClick={addComment} disabled={!value}>Add</Button>
            <div>
                {commentFilter.map(comment => (
                    <div key={comment._id}>
                    <h3>{comment.value}
                    <Button className="button-right" type="danger" onClick={() => deleteComment(comment._id)}>X</Button>
                    <Button className="button-right" type="primary" onClick={() => updateComment(comment)}>Edit</Button></h3>
                    </div>
                ))}
            </div>
        </div>

    )


}

export default Comment;