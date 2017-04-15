var fs = require('fs');
var path = require('path');
var extract_code = require('./extract_code');
var mk_pdf = require('./mk_pdf');

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
var project_path = path.resolve(process.argv[1], '../../../');
var local_path = __dirname;

// file names

// file paths
var input_md_path =                 path.join(project_path, input_md_filename);
var input_code_pre_path =           path.join(project_path, output_code_filename+'.pre');
var input_code_post_path =          path.join(project_path, output_code_filename+'.post');
var output_code_path =              path.join(project_path, output_code_filename);
var output_source_pdf_path =        path.join(project_path, project_name+'.pdf');
var output_standard_document_path = path.join(project_path, project_name+'_standard.md');
var output_standard_pdf_path =      path.join(project_path, project_name+'_standard.pdf');

var output_css_path = path.join(local_path, 'style.css');

// read markdown string
var input_string = fs.readFileSync(input_md_path, {encoding: 'utf8'});

// extract and write code string
var extract_code_output_obj = extract_code(input_string);
var code_string = extract_code_output_obj.code_string;
var input_string_pre = fs.readFileSync( input_code_pre_path, {encoding: 'utf8'}) || '';
var input_string_post = fs.readFileSync( input_code_post_path, {encoding: 'utf8'}) || '';
code_string = input_string_pre + code_string + input_string_post;
fs.writeFileSync(output_code_path, code_string, {encoding: 'utf8'});

var standard_document_string = extract_code_output_obj.standard_document_string;
fs.writeFileSync(output_standard_document_path, standard_document_string, {encoding: 'utf8'});

// write pdf
mk_pdf(input_md_path, output_source_pdf_path, output_css_path);
mk_pdf(output_standard_document_path, output_standard_pdf_path, output_css_path);
