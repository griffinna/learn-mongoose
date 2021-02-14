const mongoose = require('mongoose');

const connect = () => {
    // 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인 
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // 몽구스와 몽고디비 연결
    mongoose.connect('mongodb://root:0000@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if(error) {
            console.log('mongodb connect error', error);
        } else {
            console.log('mongodb connect success');
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error('mongodb connect error', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('mongodb disconnected... try re-connect');
    connect();
});

module.exports = connect;