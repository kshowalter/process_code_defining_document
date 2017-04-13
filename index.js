var fs = require('fs');
var path = require('path');
var extract_code = require('./extract_code');
var mk_pdf = require('./mk_pdf');

console.log(process.argv);

var args_array = [];
for( var i = 2; true; i++ ){
  var input = process.argv[i];
  if( input === undefined ){break;}
  args_array.push(input);
}

// get CLI arguments
var input_md_filename = args_array[0];
var project_name = input_md_filename.split('.')[0];
var output_code_filename = args_array[1] || project_name+'.js' ;

// Set base path
var base_path = path.join(__dirname, '../');

// file paths
var input_md_path = path.join(base_path, input_md_filename);
var output_code_path = path.join(base_path, output_code_filename);
var output_pdf_path = path.join(base_path, input_md_filename+'.pdf');
var output_css_path = path.join(base_path, '/extract_code/style.css');
var input_code_pre_path = path.join(base_path, '/javascript/' + output_code_filename+'.pre');
var input_code_post_path = path.join(base_path, '/javascript/' + output_code_filename+'.post');

// read markdown string
var input_string = fs.readFileSync(input_md_path, {encoding: 'utf8'});

// extract and write code string
var output_string = extract_code(input_string);
var input_string_pre = fs.readFileSync( input_code_pre_path, {encoding: 'utf8'}) || '';
var input_string_post = fs.readFileSync( input_code_post_path, {encoding: 'utf8'}) || '';
output_string = input_string_pre + output_string + input_string_post;
fs.writeFileSync(output_code_path, output_string, {encoding: 'utf8'});

// write pdf
mk_pdf(input_md_path, output_pdf_path, output_css_path);
