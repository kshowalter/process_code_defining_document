var path = require('path');
var markdownpdf = require('markdown-pdf');


var mk_pdf = function(md_path, pdf_path, css_path){

  var options = {
    paperFormat: 'letter',
    paperBorder: '0.5in',
    //cssPath: 'style.css',
    cssPath: css_path,
    remarkable: {
      html: true,
      breaks: true,
      //plugins: [ require('remarkable-classy') ],
      syntax: [ 'footnote', 'sup', 'sub' ]
    }
  };

  markdownpdf(options)
    .from( md_path )
    .to( pdf_path, function (){
      console.log('pdf done');
    });

};


/*
var args_array = [];
for( var i = 2; true; i++ ){
  var input = process.argv[i];
  if( input === undefined ){break;}
  args_array.push(input);
}

var input_filename = args_array[0];

var base_path = path.resolve(__dirname, '../');
var md_path = base_path+'/'+input_filename;
var pdf_path = base_path+'/'+input_filename+'.pdf';
var css_path = base_path + '/extract_code/style.css';

mk_pdf(md_path, pdf_path, css_path);
*/

module.exports = mk_pdf;
