from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def convert_currency():
    if request.method == 'POST':
        amount = float(request.form['amount'])
        response = requests.get('https://v6.exchangeratesapi.io/latest', params={'base': 'CLP', 'symbols': 'USD'})
        data = response.json()
        conversion_rate = data['rates']['USD']
        converted_amount = amount / conversion_rate
        return render_template('index.html', converted_amount=converted_amount)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
