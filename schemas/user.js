const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }, 
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 몽구스의 model 메서드로 스키마와 몽고디비 컬렉션을 연결하는 모델 생성
module.exports = mongoose.model('User', userSchema);