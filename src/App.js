import React, { useState, createRef, useEffect } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import './style.scss';
import { ReplyIcon } from './icons.js';
import { RetweetIcon } from './icons.js';
import { LikeIcon } from './icons.js';
import { ShareIcon } from './icons.js';
import { VerifiedIcon } from './icons.js';
import { AvatarLoader } from './loaders.js';


const tweetFormat = tweet => {
  tweet = tweet.replace(/@([\w]+)/g, '<span>@$1</span>');
  tweet = tweet.replace(/#([\wşçöğüiİÜĞÖÇŞ]+)/gi, '<span>#$1</span>');
  tweet = tweet.replace(/@([\w]+)/g, '<span>@$1</span>');
  tweet = tweet.replace(/(https?:\/\/[\w\.\/]+)/g, '<span>$1</span>');
  return tweet;
};

const formatNumber = number => {
  if(!number) {
    number = 0;
  }
  if(number < 1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split('.');
  return number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : 'B'); 
};

export default function App() {
  const tweetRef = createRef(null);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(true);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState();
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect (() => {
    console.log(image);
  }, [image]);


  const avatarHandle = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.addEventListener('load', function() {
    setAvatar(this.result)
  });
  reader.readAsDataURL(file)
  };
  return (
    <div class="root" id="root">
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
        <li>
          <label>Profil Resmi</label>
            <input
              type="file"
              onChange={avatarHandle}
            />
          </li>
          <li>
            <input
              type="text"
              className="input"
              placeholder="Ad Soyad"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              className="input"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </li>
          <li>
            <textarea
              className="input"
              placeholder="Tweet"
              value={tweet}
              onChange={e => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Retweet</label>
            <input
              type="number"
              className="input"              value={retweets}
              onChange={e => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>Alıntı Tweetler</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={e => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>Beğeni</label>
            <input
              type="number"
              className="input"
              placeholder=""
              value={likes}
              onChange={e => setLikes(e.target.value)}
            />
          </li>
          <li>
            <button onClick={getImage}>Oluştur</button>
            <div className="download-url">
              {image && (<a href={image} download="tweet.png">Tweeti İndir</a>)}
            </div>
          </li>
        </ul>
      </div>
      <div className="tweet-area">
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <AvatarLoader/>}
            <div>
              <div className="name">
                {name || 'Ad Soyad'} {isVerified && <VerifiedIcon width="19" />}
              </div>
              <div className="username">@{username || 'KullanıcıAdı'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p dangerouslySetInnerHTML={{__html: (tweet && tweetFormat(tweet)) || 'Bu alana yazı gelecek'}}>
            </p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweets)}</b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> Alıntı Tweetler
            </span>
            <span>
              <b>{formatNumber(likes)}</b> Beğeni
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
