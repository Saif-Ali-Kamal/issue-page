import {API, cond, and} from 'space-api';

class Service {
    constructor(projectId, url){
        this.api = new API(projectId, url);
        this.db = this.api.Mongo();
    }
    
    async signIn(username, pass) {
        const res = await this.db.signIn(username, pass);

        if(res.status !== 200){
            return {ack: false};
        }

        this.api.setToken(res.data.token);
        this.userId = res.data.user._id;
        
        return {ack: true};
    }

    async signUp(email, username, pass) {
        const res = await this.db.signUp(email, username, pass, 'default');

        if(res.status !== 200){
            return {ack: false};
        }

        this.api.setToken(res.data.token);
        this.userId = res.data.user._id;

        return {ack: true};
    }

    async addIssue(value) {
        
        const obj = { _id: this.generateId(), value: value, date: Date(), opened: true}
   
        const res = await this.db.insert('issues').doc(obj).apply();
    
        if(res.status !== 200) {
            return { ack: false };
        }

        return { ack: true, doc: obj };
        
    }

    async deleteIssue(id) {
        const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

        const res = await this.db.delete('issues').where(condition).apply();
      
        if(res.status !== 200) {
            return { ack: false};
        }

        return {ack: true};
    }

    async updateIssue(id, opened){
        const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

        const res = await this.db.update('issues').set({opened: opened}).where(condition).apply();

        if(res.status !== 200) {
            return { ack: false};
        }

        return {ack: true};
    }

    async getIssue(cb) {
        //const condition = cond('userId', '==', this.userId);

        const onSnapshot = (docs, type, changedDoc) => {
            cb(null, docs);
        }

        const onError = (err) => {
            console.log('live query err', err);
            cb(err);
        }   

        return this.db.liveQuery('issues').subscribe(onSnapshot, onError);
    }

    async addComment(value, issueId) {
        
        const obj = { _id: this.generateId(), value: value, date: Date(), issueId: issueId};
   
        const res = await this.db.insert('comments').doc(obj).apply();
    
        if(res.status !== 200) {
            return { ack: false };
        }

        return { ack: true, doc: obj };
        
    }

    async getComment(cb) {
        //const condition = cond('userId', '==', this.userId);

        const onSnapshot = (docs, type, changedDoc) => {
            cb(null, docs);
        }

        const onError = (err) => {
            console.log('live query err', err);
            cb(err);
        }   

        return this.db.liveQuery('comments').subscribe(onSnapshot, onError);
    }

    async deleteComment(id) {
        const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

        const res = await this.db.delete('comments').where(condition).apply();
      
        if(res.status !== 200) {
            return { ack: false};
        }

        return {ack: true};
    }

    async updateComment(id, value){
        const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

        const res = await this.db.update('comments').set({value: value}).where(condition).apply();

        if(res.status !== 200) {
            return { ack: false};
        }

        return {ack: true};
    }

    generateId = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };
}


export default Service;