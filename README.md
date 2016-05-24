# Huge File Processor

I needed to read a huge file (let's say 10GB), capture which strings (each line has one string, and it could be any word, sequence of character, sentence, whatever) are duplicating and show the 5 most occurred strings and how many times it is been repeated.

[hfp-array] The first approach I've tried does not work for huge files, it breaks with files from 300MB. That happens because I'm storing everything on memory.

[hfp-sqlite] The second approach, using SQLite, works, but it still too slow.

[hfp-mergesort] The last approch, which works, uses merge sort comparison-based sorting algorithm.


## Tech Stack

Node, Event Stream, SQLite.


## Installation

You need to have [node](https://nodejs.org/en/download/) instaled.

`$ npm install` on server folder


## Running

`$ node server` on server folder


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -a 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## License

<a href="http://opensource.org/licenses/MIT" target="_blank">The MIT License</a>