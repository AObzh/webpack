import { Article } from './Article';
import './styles/styles';
// import logo from './assets/webpack.svg'
import logo from './assets/webpack-logo.png';
import csv from '@root/cities';
// import json from './assets/cities'
import $ from 'jquery';
import './babel';

const unUsed = 7

const article = new Article('Webpack Course', logo);

$('pre.article').text(article.toString());

// console.log("JSON:  ", json);
console.log('CSV:  ', csv);
console.log('Article toString: ', article.toString());
