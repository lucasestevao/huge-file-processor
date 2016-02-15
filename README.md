# huge-file-processor
I need to read a huge file (let's say 10GB), capture which strings (each line has one string, and it could be any word, sequence of character, sentence, whatever) are duplicating and show the 5 most occurred strings ans how many times it is been repeated.

The first approach I've tried does not work for huge files, it breaks with files from 300MB. That happens because I'm storing everything on memory.

The second approach, using SQLite, works, but it still too slow.

I'm still trying to figure it out a way to solve that problem with a fast approach.

## Installation

`$ npm install` on server folder

## Running

`$ node server` on server folder

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://opensource.org/licenses/MIT)