const fetch = require("node-fetch");

exports.getRandomImg = async(subreddit, nsfw = false, flair) => {
    var posts = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`, { method: "GET" })

    const filtr = (post) => post.data.over_18 === nsfw && post.data.post_hint === "image";
    
    posts = await posts.json();
    posts = posts.data.children.filter(post => filtr(post));

    return posts[Math.floor(Math.random() * posts.length)].data;
}

exports.getDateString = (date) => {
    var timezone = date.getTimezoneOffset();
    timezone = -timezone / 60;
    if(timezone >= 0)
        timezone = `UTC +${timezone}`;
    else
        timezone = `UTC ${timezone}`;

    return `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")} ${timezone}`;
}