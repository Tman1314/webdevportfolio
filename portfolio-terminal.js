const directories = {
  education: [
    '',
    '<white>education</white>',

    '* <a href="https://en.wikipedia.org/wiki/American_InterContinental_University">American Intercontinental University</a> <yellow>"Software Development and Design"</yellow> 2011-2015 / 2018-2019',
    ''
  ],
  projects: [
    '',
    '<white>Projects</white>',
    [
      ['Jackson County Sherrif\'s Department Concealed Hangun License(CHL) Online Application',
        'https://forms.jacksoncountyor.gov/Forms/CHLApp',
        'Online CHL System. Includes custom appointment app built-in.'
      ],
    ].map(([name, url, description = '']) => {
      return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
    }),
    ''
  ].flat(),
  skills: [
    '',
    '<white>languages</white>',

    [
      'JavaScript',
      'TypeScript',
      'Python',
      'C#',
      'SQL',
      'PHP',
      'Bash'
    ].map(lang => `* <yellow>${lang}</yellow>`),
    '',
    '<white>libraries</white>',
    [
      'React.js',
      'jQuery',
      'Pyramid',
      'Django',
      'Node.js',
    ].map(lib => `* <green>${lib}</green>`),
    '',
    '<white>tools</white>',
    [
      'Docker',
      'git',
      'Linux(Ubuntu)/WSL',
      'GitLab/GitHub',
      'Figma',
    ].map(lib => `* <blue>${lib}</blue>`),
    ''
  ].flat()
};

const root = '~';
let cwd = root;
const user = 'guest';
const server = 'tannermills.dev';
const dirs = Object.keys(directories);
const url = 'https://v2.jokeapi.dev/joke/Programming';

const ready = () => {
  const seed = rand(256);
  term.echo(() => rainbow(render('Tanner Mills - Web Dev'), seed))
    .echo(`\n<white>> Welcome to my Terminal-based Portfolio</white>\n`)
    .resume();
}

const render = text => {
  const cols = term.cols();
  return trim(figlet.textSync(text, {
    font: font,
    width: cols,
    whitespaceBreak: true
  }));
}

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

const trim = str => {
  return str.replace(/[\n\s]+$/, '');
}

const rand = max => {
  return Math.floor(Math.random() * (max + 1));
}

const rainbow = (str, seed) => {
  return lolcat.rainbow((char, color) => {
    char = $.terminal.escape_brackets(char);
    return `[[;${hex(color)};]${char}]`;
  }, str, seed).join('\n')
}

const hex = color => {
  return '#' + [color.red, color.green, color.blue].map(n => {
    return n.toString(16).padStart(2, '0');
  }).join('');
}

const prompt = () => {
  return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

const print_dirs = () => {
  term.echo(dirs.map(dir => {
    return `<blue class="directory">${dir}</blue>`;
  }).join('\n'));
}

const commands = {
  help() {
    term.echo(`List of available commands: ${help}`)
  },
  echo(...args) {
    if (args.length > 0) {
      term.echo(args.join(' '));
    }
  },
  cd(dir = null) {
    if (dir === null || (dir === '..' && cwd !== root)) {
      cwd = root;
    } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
      cwd = dir;
    } else if (dirs.includes(dir)) {
      cwd = root + '/' + dir;
    } else {
      this.error('Wrong directory');
    }
  },
  ls(dir = null) {
    if (dir) {
      if (dir.startsWith('~/')) {
        const path = dir.substring(2);
        const dirs = path.split('/');
        if (dirs.length > 1) {
          this.error('Invalid directory');
        } else {
          const dir = dirs[0];
          this.echo(directories[dir].join('\n'));
        }
      } else if (cwd === root) {
        if (dir in directories) {
          this.echo(directories[dir].join('\n'));
        } else {
          this.error('Invalid directory');
        }
      } else if (dir === '..') {
        print_dirs();
      } else {
        this.error('Invalid directory');
      }
    } else if (cwd === root) {
      print_dirs();
    } else {
      const dir = cwd.substring(2);
      this.echo(directories[dir].join('\n'));
    }
  },
  async joke() {
    const res = await fetch(url);
    const data = await res.json();
    (async () => {
      if (data.type == 'twopart') {
        const prompt = this.get_prompt();
        this.set_prompt('');
        await this.echo(`Q: ${data.setup}`, {
          delay: 50,
          typing: true
        });
        await this.echo(`A: ${data.delivery}`, {
          delay: 50,
          typing: true
        });
        this.set_prompt(prompt);
      } else if (data.type === 'single') {
        this.echo(data.joke, {
          delay: 50,
          typing: true
        });
      }
    })();
  },
  credits() {
    return [
      '',
      '<white>Used libraries:</white>',
      '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
      '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
      '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
      '* <a href="https://jokeapi.dev/">Joke API</a>',
      ''
    ].join('\n');
  }
};
const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
  return `<white class="command">${cmd}</white>`;
});


const help = formatter.format(formatted_list);
const any_command_re = new RegExp(`^(${command_list.join('|')})$`);
$.terminal.new_formatter([any_command_re, '<white>$1</white>']);

const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);
$.terminal.new_formatter([re, function (_, command, args) {
  return `<white>${command}</white><aqua>${args}</aqua>`;
}]);

$.terminal.xml_formatter.tags.green = (attrs) => {
  return `[[;#44D544;]`;
};

$.terminal.xml_formatter.tags.blue = (attrs) => {
  return `[[;#55F;;${attrs.class}]`;
};

const font = 'Slant';
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

const term = $('#terminal').terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
  completion(string) {
    const cmd = this.get_command();
    const { name, rest } = $.terminal.parse_command(cmd);
    if (['cd', 'ls'].includes(name)) {
      if (rest.startsWith('~/')) {
        return dirs.map(dir => `~/${dir}`);
      }
      if (cwd === root) {
        return dirs;
      }
    }
    return Object.keys(commands);
  },
  prompt,
});

term.pause();

term.on('click', '.directory', function () {
  const dir = $(this).text();
  term.exec(`cd ~/${dir}`);
});


if (true) {

}