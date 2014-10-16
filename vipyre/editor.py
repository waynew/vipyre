from flask import Flask, render_template

app = Flask(__name__)
config = app.config
config['URL'] = 'http://localhost:9999'

@app.route('/')
def main():
    return render_template('index.html')


def start():
    app.run('localhost', port=9999, debug=True)


if __name__ == "__main__":
    start()
