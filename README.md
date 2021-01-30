**Core Hub** is an self-hosted boilerplate for PHP and Angular projects 

[![Dashboard](docs/screenshots/dashboard.png)](docs/screenshots/dashboard.png)

More [screenshots](docs/en/screenshots.md).

* [System requirements](#system-requirements)
* [Features](#features)
* [License](#license)

## System requirements

* Unix-like OS (**Windows isn't supported**);

* PHP 7.2+ (with OpenSSL support and enabled functions: `exec()`, `shell_exec()` and `proc_open()`);

* Web-server (Nginx or Apache2);

* Database (MySQL/MariaDB);

## Features

* Clone project from [GitHub](docs/en/sources/github.md), or from local 
directory;

* Set up and tear down database tests for [MySQL](docs/en/plugins/mysql.md);

* Install [Composer](docs/en/plugins/composer.md) dependencies;

* Run tests for PHPUnit, Atoum, Behat, Codeception and PHPSpec;

* Check code via Lint, PHPParallelLint, Pdepend, PHPCodeSniffer, PHPCpd, PHPCsFixer, PHPDocblockChecker, PHPLoc, 
PHPMessDetector, PHPTalLint and TechnicalDebt;

## License

PHP Censor is open source software licensed under the [BSD-2-Clause license](LICENSE).