var fs = require('fs');
var path = require('path');

//var code_check = /^\s+[^\S]/;
var code_check = /^\s{4}/;

var extract_code = function(input_string){
  //var input = extract_metadata(input_string);

  if( input_string.trim() !== '' ){

    var lines = input_string.split('\n');

    var output_code_array = [];
    var output_document_array = [];
    var code_string;
    var standard_document_string;


    lines.forEach(function(line, i){
      var matches = code_check.exec(line);
      if( matches !== null && line.trim()[0] !== '*' ) {
        var whitespace_size = matches[0].length;
        //var unindented_code_line = line.slice(whitespace_size);
        var unindented_code_line = line.slice(4);
        var code_line = '  ' + unindented_code_line;
        output_code_array.push(code_line);
      } else {
        output_document_array.push(line);
      }

    });

    code_string = output_code_array.join('\n');
    standard_document_string = output_document_array.join('\n');

  } else {
    code_string = input_string;
    standard_document_string = input_string;
  }

  return {
    code_string: code_string,
    standard_document_string: standard_document_string
  }
};



/*

var args_array = [];
for( var i = 2; true; i++ ){
  var input = process.argv[i];
  if( input === undefined ){break;}
  args_array.push(input);
}

//console.log(args_array);

var input_md_filename = args_array[0];
var output_code_filename = args_array[1];


var base_path = path.resolve(__dirname, '../');

var input_file_path = path.resolve(base_path, input_md_filename);
var input_string = fs.readFileSync(input_file_path, {encoding: 'utf8'});

var output_string = extract_code(input_string);

var output_file_path = path.resolve(base_path, output_code_filename);
var input_string_pre = fs.readFileSync( base_path + '/extract_code/' + output_code_filename+'.pre', {encoding: 'utf8'}) || '';
var input_string_post = fs.readFileSync( base_path + '/extract_code/' + output_code_filename+'.post', {encoding: 'utf8'}) || '';
output_string = input_string_pre + output_string + input_string_post;
fs.writeFileSync(output_file_path, output_string, {encoding: 'utf8'});

*/

module.exports = extract_code;
