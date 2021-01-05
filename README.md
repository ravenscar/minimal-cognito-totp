# minimal-cognito-totp
Minimal implementation to turn cognito b32 TOTP seeds into 6 digit codes, for integration testing with TOTP SMS.

If you want to use actual Cogfnito TOTP codes in your integration or unit tests you can use this module to generate them.

Example:
```
const { getTotp } = require('minimal-cognito-totp');

// with a t value
const code1 = getTotp("6C727YG4LRZRAMYD5YBNMTKPUFGIN5ZUNPBB2RJ74D5GE5OCWD7A", 53660796); // 057397

// without a t value (current time)
const code2 = getTotp("6C727YG4LRZRAMYD5YBNMTKPUFGIN5ZUNPBB2RJ74D5GE5OCWD7A");
```

Why?

I am writing a library (https://github.com/ravenscar/franken-srp) that interacts with AWS cognito and I need to do some integration testing that uses actual TOTP values, as cognito is almost impossible to mock.