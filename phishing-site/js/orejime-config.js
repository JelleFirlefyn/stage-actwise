switch(document.documentElement.lang) {
		case "nl":
		  var transapps = {
			  'essential':'Essentieel',
			  'functional':'Functioneel',
			  'cookie_policy_url':'/nl/*****************'
		  }			  
		  break;
		case "fr":
		  var transapps = {
			  'essential':'Essentiel',
			  'functional':'Fonctionnel',
			  'cookie_policy_url':'/fr/********************'
		  }			  
		  break;
		case "en":
		  var transapps = {
			  'essential':'Essential',
			  'functional':'Functional',
			  'cookie_policy_url':'/fr/******************'
		  }			  
		  break;
		case "de":
		  var transapps = {
			  'essential':'Essentiell',
			  'functional':'Funktional',
			  'cookie_policy_url':'/de/****************'
		  }			  
		  break;
	}
var orejimeConfig = {	
		
    elementID: "fedconsent",
    // set this to match the page's id - usually this is "page" - TODO: relation between this and skiplink.    
    // name of the cookie in which consent is stored
    cookieName: "fedconsent",
    cookieExpiresAfterDays: 90,
	//Theming option 
	theme: 'light',
	privacyPolicy: transapps['cookie_policy_url'],
   	// Added the BOSA Gdpr compliance parameter
	gdprCompliant: true,	
    // Optional. Applications configured below will be ON by default if default=true.
    // defaults to true
    default: false,
    // site specific config				
    translations: {
       nl: {		    
            consentModal: {
                title: 'Onze site maakt gebruik van cookies',
                description: 'Wat is een cookie ? Welke cookies gebruiken we en waarom?',
                privacyPolicy: {
                    name: 'cookiebeleid',
                    text: 'Lees er meer over in ons {privacyPolicy}.',
                }
            },
            consentNotice: {
				privacyPolicy: {
                    name: 'cookiebeleid',
                    text: 'Lees er meer over in ons {privacyPolicy}.',
                },
                changeDescription: 'Er waren wijzigingen sinds uw laatste bezoek, werk uw voorkeuren bij.',
                description: 'Deze website maakt gebruik van cookies. De essentiële en functionele cookies zijn nodig voor het goed functioneren van de website en kunnen niet worden geweigerd. Andere cookies worden gebruikt voor statistische doeleinden (analytische cookies) en worden enkel geplaatst nadat je een keuze gemaakt hebt. {privacyPolicy}',
                learnMore: 'Cookies instellen'
            },
            save: 'Mijn keuze bevestigen',
            decline: 'Optionele cookies weigeren',
            accept: 'Alle cookies aanvaarden',
            acceptAll: 'Optionele cookies aanvaarden',
            saveData: 'Mijn configuratie voor de informatievergaring opslaan',
            declineAll: 'Optionele cookies deactiveren',
            close: 'Sluiten',
            enabled: 'Geactiveerd',
            disabled: 'Gedesactiveerd',
            app: {
              optOut: {
                  title: '(afmelden)',
                  description: 'Deze app is standaard geladen (maar je kunt je afmelden)',
              },
            required: {
                  title: '(altijd verplicht)',
                    description: 'Deze cookies zijn vereist ',
                },
                purposes: 'Doeleinden',
                purpose: 'Doeleinde'
            },
            poweredBy: '',
            essential: {
                description: 'Wij gebruiken cookies die technisch noodzakelijk zijn voor een vlot bezoek aan de website. Deze cookies plaatsen wij automatisch zodra u op de website komt en u kunt ze niet weigeren. We zijn wel verplicht om ze voor u op te lijsten.',
           	},
			functional: {
                description: 'Als u onze website wilt gebruiken, mag u deze cookies niet weigeren. Toch plaatsen we ze pas wanneer u uw keuze bevestigd hebt..',
            },
			googleanalytics: {                
                description: 'Deze cookies volgen uw bezoek en de herkomst van uw bezoek. We gebruiken ze om statistieken op te stellen waarop we ons baseren om de site te verbeteren en gebruiksvriendelijker te maken. De gegevens worden anoniem geanalyseerd.',
            },
			matomo: {                
                description: 'Deze cookies volgen uw bezoek en de herkomst van uw bezoek. We gebruiken ze om statistieken op te stellen waarop we ons baseren om de site te verbeteren en gebruiksvriendelijker te maken. De gegevens worden anoniem geanalyseerd.',
            },
            purposes: {
				basic: 'basisdienst',
                analytics: 'statistieken',               				
            },
        },
		fr: {			
            consentModal: {
                title: 'Notre site utilise des cookies',
                description: 'Qu’est-ce qu’un cookie ? Quels cookies utilisons nous et pourquoi ?',
                privacyPolicy: {
                    name: 'politique en matière de cookies',
                    text: 'Lisez notre {privacyPolicy} pour en savoir plus.',
                }
            },
            consentNotice: {
				privacyPolicy: {
                    name: 'politique en matière de cookies',
                    text: 'Consultez notre {privacyPolicy} pour en savoir plus.',
                },
                changeDescription: 'Des changements ont eu lieu depuis votre dernière visite, updatez vos préférences.',
                description: 'Ce site utilise des cookies. Les cookies essentiels et fonctionnels sont nécessaires pour le bon fonctionnement du site et vous ne pouvez pas les refuser. D’autres cookies sont utilisés à des fins statistiques (cookies analytiques) et ne sont placés que si vous en faites le choix spécifique. ',
                learnMore: 'Paramétrer les cookies'
            },
            save: 'Confirmer mon choix',
            decline: 'Refuser cookies optionnels',
            accept: 'Accepter cookies optionnels',
            acceptAll: 'Accepter tous les cookies',
            saveData: 'Sauver ma configuration pour la collection de données',
            declineAll: 'Refuser cookies optionnels',
            close: 'Fermer',
            enabled: 'Activé',
            disabled: 'Désactivé',
            app: {
              optOut: {
                  title: '(déconnecter)',
                  description: 'Cet application est activé par défaut (mais vous pouvez vous déconnecter))',
              },
            required: {
                  title: '(toujours requis)',
                    description: 'Ces cookies sont obligatoires ',
                },
                purposes: 'Utilisations',
                purpose: 'Utilisation'
            },
            poweredBy: '',
            essential: {
                description: 'Ces cookies sont nécessaires pour des raisons purement techniques pour une visite normale du site Internet. Vu la nécessité technique, seule une obligation d\'information s\'applique, et ces cookies sont placés dès que vous accédez au site Internet.',
            },
			functional: {
                description: 'Vous ne pouvez pas refuser ces cookies si vous désirez naviguer de manière optimale sur ce site Internet, mais ils ne sont placés qu\'après qu\'un choix aura été effectué concernant le placement de cookies.',
            },
			googleanalytics: {
                description: 'Il s\'agit de cookies qui nous permettent de savoir combien de fois une page déterminée a été consultée. Nous utilisons ces informations uniquement pour améliorer le contenu de notre site Internet. Ces cookies ne sont placés que si vous en acceptez le placement.',
            },
			matomo: {
                description: 'Il s\'agit de cookies qui nous permettent de savoir combien de fois une page déterminée a été consultée. Nous utilisons ces informations uniquement pour améliorer le contenu de notre site Internet. Ces cookies ne sont placés que si vous en acceptez le placement.',
            },
            purposes: {
				basic: 'service de base',
                analytics: 'statistiques',               				
            },
        },
		       en: {		    
            consentModal: {
                title: 'Our site uses cookies',
                description: 'What is a cookie ? What cookies do we use and why?',
                privacyPolicy: {
                    name: 'cookie policy',
                    text: 'Read more in our {privacyPolicy}.',
                }
            },
            consentNotice: {
				privacyPolicy: {
                    name: 'cookie policy',
                    text: 'Read more in our {privacyPolicy}.',
                },
                changeDescription: 'There have been changes since your last visit, please adjust your preferences.',
                description: 'This website uses cookies. Essential and functional cookies are necessary for the proper functioning of the website and cannot be refused. Other cookies are used for statistical purposes (analytical cookies) and these cookies are only placed if you choose to do so. Read all about them in our{privacyPolicy}.',
                learnMore: 'Configure cookies'
            },
            save: 'Confirm my choice',
            decline: 'Refuse optional cookies',
            accept: 'Accept all cookies',
            acceptAll: 'Accept optional cookies',
            saveData: 'Save my configuration for information gathering',
            declineAll: 'Decline optional cookies',
            close: 'Close',
            enabled: 'Enabled',
            disabled: 'Disabled',
            app: {
              optOut: {
                  title: '(optout)',
                  description: 'This app is enabled by default (but opting out is possible)',
              },
            required: {
                  title: '(always required)',
                    description: 'These cookies are mandatory',
                },
                purposes: 'Purposes',
                purpose: 'Purpose'
            },
            poweredBy: '',
            essential: {
                description: 'These cookies are necessary for purely technical reasons for a normal visit to the website. Given the technical necessity, only an information obligation applies, and these cookies are placed as soon as you access the website.',
           	},
			functional: {
                description: 'You cannot refuse these cookies if you wish to browse this website, but they are only placed after a choice has been made regarding the placement of cookies.',
            },
			googleanalytics: {                
                description: 'These are cookies that allow us to know how many times a specific page has been visited. We only use this information to improve the content of our website. These cookies are only placed if you accept their placement.',
            },
			matomo: {                
                description: 'These are cookies that allow us to know how many times a specific page has been visited. We only use this information to improve the content of our website. These cookies are only placed if you accept their placement.',
            },
            purposes: {
				basic: 'basic service',
                analytics: 'Statistics',               				
            },
        },
		de: {
            consentModal: {
                title: 'Unsere Website verwendet Cookies',
                description: 'Was ist ein Cookie? Welche Cookies verwenden wir und warum?',
                privacyPolicy: {
                    name: 'Cookierichtlinie',
                    text: 'Lesen Sie unsere {privacyPolicy}, um mehr zu erfahren.',
                }
            },
            consentNotice: {
				privacyPolicy: {
                    name: 'Cookierichtlinie',
                    text: 'Lesen Sie unsere {privacyPolicy}, um mehr zu erfahren.',
                },
                changeDescription: 'Seit Ihrem letzten Besuch wurden Änderungen vorgenommen. Aktualisieren Sie Ihre Einstellungen.',
                description: 'Diese Website nutzt Cookies. Technisch notwendige und funktionale Cookies sind für eine reibungslose Funktion der Website von wesentlicher Bedeutung und können nicht deaktiviert werden. Technisch notwendige Cookies werden nur einmal gespeichert, nachdem eine Auswahl getroffen worden ist. Andere Cookies dienen statistischen Zwecken (Analyse-Cookies) und werden nur dann gespeichert, wenn Sie dazu Ihre Zustimmung gegeben haben. Um mehr zu erfahren, siehe unsere {privacyPolicy}.',
                learnMore: 'Cookie-Einstellungen'
            },
            save: 'Bestätige meine Wahl',
            decline: 'Verweigern optionalen Cookies',
            accept: 'Akzeptiere alle Cookies',
            acceptAll: 'Akzeptiere optionalen Cookies',
            saveData: 'Speichern Sie meine Konfiguration für die Datenerfassung',
            declineAll: 'Verweigern optionalen Cookies',
            close: 'Schließen',
            enabled: 'Aktiviert',
            disabled: 'Untauglich',
            app: {
              optOut: {
                  title: '(Abmelden)',
                  description: 'Diese App ist standardmäßig aktiviert (Sie können sich jedoch abmelden).',
              },
            required: {
                  title: '(immer obligatorisch)',
                    description: 'Diese Cookies sind immer erfordlich ',
                },
                purposes: 'Nutzung',
                purpose: 'Nutzung'
            },
            poweredBy: '',
            essential: {
                description: 'Diese Cookies sind aus rein technischen Gründen für einen normalen Besuch der Website erforderlich. Aus technischen Gründen besteht nur eine Informationspflicht, und diese Cookies werden gesetzt, sobald Sie auf die Website zugreifen.',
            },
			functional: {
                description: 'Diese Cookies können nicht abgelehnt werden, wenn Sie durch diese Website navigieren, sie werden jedoch nur dann gesetzt, wenn Sie die Speicherung solcher Cookies vorher ausgewählt haben.',
            },			
			googleanalytics: {
                description: 'Hierbei handelt es sich um Cookies, die es uns ermöglichen, zu überprüfen, wie häufig eine bestimmte Seite aufgerufen worden ist. Wir verwenden solche Informationen ausschließlich zur Verbesserung der Inhalte unserer Website. Diese Cookies werden nur mit Ihrer Zustimmung gespeichert.',
            },
			matomo: {
                description: 'Hierbei handelt es sich um Cookies, die es uns ermöglichen, zu überprüfen, wie häufig eine bestimmte Seite aufgerufen worden ist. Wir verwenden solche Informationen ausschließlich zur Verbesserung der Inhalte unserer Website. Diese Cookies werden nur mit Ihrer Zustimmung gespeichert.',
            },
            purposes: {
				basic: 'Basisdienst',
                analytics: 'Statistiken',               				
            },
        },
    },
    apps: [ {
            name: 'essential',
            title: transapps['essential'],
            purposes: ['basic'],
            default: true,
            required: true,
        },
		{
            name: 'functional',
            title: transapps['functional'],
            purposes: ['basic'],
            default: true,
            required: true,
        },		
//        {
//            name: "googleanalytics",
//            title: "Google Analytics",
//            cookies: [
//                "_ga",
//                "_gat",
//                "_gid",
//                "__utma",
//                "__utmb",
//                "__utmc",
//                "__utmt",
//                "__utmz"],
//            purposes: ["analytics"],
//			default: false,            
//        },
		{
            name: "matomo",
            title: "Matomo",
            cookies: ["matomo_session", "pk_id", "pk_ses", "_pk_ref", "_pk_cvar"],
            purposes: ["analytics"],
            default: false
        }
    ],
}
