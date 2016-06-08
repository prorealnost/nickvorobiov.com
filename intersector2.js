yaml = require('js-yaml');
fs   = require('fs');

slug = '2016-03-22';

var data = fs.readFileSync('./_meta/' + slug + '.yml', 'utf8');
yaml.safeLoadAll(data, function (doc) {
  if (doc) {
    run(doc);
  }
});

function run(doc) {
  var pluswords = new RegExp(' (без|в|где|для|до|за|зачем|из|к|как|какой|кем|когда|кого|ком|кому|который|к'
    +'то|куда|меня|мне|мной|мною|моего|моей|моему|моею|мои|моим|моими|моих|мой|мою'
    +'|моя|моё|моём|на|над|о|от|откуда|по|под|почему|про|ради|с|своего|своей|своем'
    +'у|своею|свои|своим|своими|своих|свой|свою|своя|своё|своём|себе|себя|сколько|'
    +'со|собой|собою|у|хочу|чего|чей|чем|чему|через|что|чём|я) ', 'g');

  var result = [];

  doc.formulae.forEach(function(formula) {
    console.log('// ' + formula.name);
    var groups = [];
    groups = formula.groupnames.map(function(groupname) {
      return doc.groups[groupname];
    });

    var res = groups.splice(0, 1)[0];

    groups.forEach(function(group) {
      var newres = [];
      res.forEach(function(item){
        group.forEach(function(word) {
          newres.push((item + ' ' + word).trim());
        })
      })
      res = newres;
    })
    result = result.concat(res);
  })

  result.forEach(function(str) {
    str = (' ' + str + ' ').replace(pluswords, ' +$1 ').trim();
    console.log(str);
  })

  console.log(result.length);
}
