from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/homepage.html')
def homepage():
    return render_template('homepage.html')

@app.route('/eboard.html')
def eboard():
    return render_template('eboard.html')

'''For example, /articles/1 will take you to article1.html'''
@app.route('/articles/<article_id>')
def article(article_id):
    return render_template(f'articles/article{article_id}.html')

@app.route('/articles.html')
def show_articles_home():
    return render_template('articles.html')

if __name__ == '__main__':
    app.run(debug=True)