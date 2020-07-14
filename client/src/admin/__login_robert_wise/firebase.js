import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyBsx86uH2iNe_TwhBg1uVoJo90kCET6Cfk",
	authDomain: "fieldsandbarnssand.firebaseapp.com",
	databaseURL: "https://fieldsandbarnssand.firebaseio.com",
	projectId: "fieldsandbarnssand",
	storageBucket: "fieldsandbarnssand.appspot.com",
	messagingSenderId: "1084061523027",
	appId: "1:1084061523027:web:f61070e6df152056b27aa6"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		console.log(this.auth.currentUser.displayName)
		return this.auth.currentUser
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()