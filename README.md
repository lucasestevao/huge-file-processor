# huge-file-processor
Read a file line by line, capture which strings are duplicating and show the 5 most occurred strings.

The first approac I tried does not work for huge fileS, it breaks with files from 300MB. that happens because I'm storing everything on memory.

The second approach, using SQLite, works, but it still slow.

## Installation

$ npm install` on server folder

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