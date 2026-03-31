import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'portfolio.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class ResearchPaper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    sector = db.Column(db.String(100), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text)
    rating = db.Column(db.String(20))  # BUY, HOLD, SELL
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'sector': self.sector,
            'summary': self.summary,
            'rating': self.rating,
            'date': self.date.isoformat()
        }

class InvestmentIdea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    thesis = db.Column(db.Text, nullable=False)
    target_return = db.Column(db.String(50))
    time_horizon = db.Column(db.String(50))
    risk_level = db.Column(db.String(50))  # Low, Moderate, High
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'thesis': self.thesis,
            'targetReturn': self.target_return,
            'timeHorizon': self.time_horizon,
            'riskLevel': self.risk_level,
            'date': self.date.isoformat()
        }

class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)
    email = db.Column(db.String(100))
    linkedin = db.Column(db.String(200))
    experience_years = db.Column(db.Integer)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'bio': self.bio,
            'email': self.email,
            'linkedin': self.linkedin,
            'experience_years': self.experience_years
        }

# Routes

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running'})

# Research Endpoints
@app.route('/api/research', methods=['GET'])
def get_research():
    research_papers = ResearchPaper.query.all()
    return jsonify([paper.to_dict() for paper in research_papers])

@app.route('/api/research/<int:id>', methods=['GET'])
def get_research_detail(id):
    paper = ResearchPaper.query.get(id)
    if not paper:
        return jsonify({'error': 'Paper not found'}), 404
    return jsonify(paper.to_dict())

@app.route('/api/research', methods=['POST'])
def create_research():
    data = request.json
    paper = ResearchPaper(
        title=data.get('title'),
        sector=data.get('sector'),
        summary=data.get('summary'),
        content=data.get('content'),
        rating=data.get('rating', 'HOLD')
    )
    db.session.add(paper)
    db.session.commit()
    return jsonify(paper.to_dict()), 201

# Investment Ideas Endpoints
@app.route('/api/investment-ideas', methods=['GET'])
def get_investment_ideas():
    ideas = InvestmentIdea.query.all()
    return jsonify([idea.to_dict() for idea in ideas])

@app.route('/api/investment-ideas/<int:id>', methods=['GET'])
def get_investment_idea_detail(id):
    idea = InvestmentIdea.query.get(id)
    if not idea:
        return jsonify({'error': 'Idea not found'}), 404
    return jsonify(idea.to_dict())

@app.route('/api/investment-ideas', methods=['POST'])
def create_investment_idea():
    data = request.json
    idea = InvestmentIdea(
        title=data.get('title'),
        thesis=data.get('thesis'),
        target_return=data.get('target_return'),
        time_horizon=data.get('time_horizon'),
        risk_level=data.get('risk_level')
    )
    db.session.add(idea)
    db.session.commit()
    return jsonify(idea.to_dict()), 201

# Portfolio Profile Endpoints
@app.route('/api/profile', methods=['GET'])
def get_profile():
    profile = Portfolio.query.first()
    if not profile:
        return jsonify({'error': 'Profile not found'}), 404
    return jsonify(profile.to_dict())

@app.route('/api/profile', methods=['POST'])
def create_profile():
    data = request.json
    profile = Portfolio(
        name=data.get('name'),
        bio=data.get('bio'),
        email=data.get('email'),
        linkedin=data.get('linkedin'),
        experience_years=data.get('experience_years')
    )
    db.session.add(profile)
    db.session.commit()
    return jsonify(profile.to_dict()), 201

@app.route('/api/profile', methods=['PUT'])
def update_profile():
    profile = Portfolio.query.first()
    if not profile:
        return jsonify({'error': 'Profile not found'}), 404
    
    data = request.json
    profile.name = data.get('name', profile.name)
    profile.bio = data.get('bio', profile.bio)
    profile.email = data.get('email', profile.email)
    profile.linkedin = data.get('linkedin', profile.linkedin)
    profile.experience_years = data.get('experience_years', profile.experience_years)
    
    db.session.commit()
    return jsonify(profile.to_dict())

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Route not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
