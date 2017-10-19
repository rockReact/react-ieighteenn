
1.
npm install react-intl-universal --save

2.loadLocales after 
  loadLocales() {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: "lang",
      cookieLocaleKey: "lang"
    });
    if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
      currentLocale = "en-US";
    }

    http
      .get(`locales/${currentLocale}.json`)
      .then(res => {
        console.log("App locale data", res.data);
        // init method will load CLDR locale data according to currentLocale
        return intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data
          }
        });
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }

3.1
render() {
  return (
    this.state.initDone &&
    <div>
      {intl.get('SIMPLE')}
    </div>
  );
}

3.2 message with variables
Locale data:
{ "HELLO": "Hello, {name}. Welcome to {where}!" }
JS code:
intl.get('HELLO', {name:'Tony', where:'Alibaba'}) // "Hello, Tony. Welcome to Alibaba!"

3.3
HTML Message
For HTML message, use getHTML instead. For example,
Locale data:
{ "TIP": "This is <span style='color:red'>HTML</span>" }
JS code:
intl.getHTML('TIP'); // {React.Element}

4.











