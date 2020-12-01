from app.models import db, Note, Tag
import datetime


def seed_note_tags():
    note1 = Note(title="<h1>Big Issues</h1>", 
	body="""<p> </p> <p>
    Economics is the study of human behaviour. Since it uses scientific methods it is called a social science. We study human behaviour to better understand and improve our world. </p><p> </p> <p>
    Inference and policy recommendations based on earlier theories, observations and institutional structures require constant analysis and updating if they are to furnish valuable responses to changing conditions and problems. <p><p> </p> <p>
    Suppose households decide to spend more money on goods and services and save less. That decision by itself does not change household sector income, but it does increase business sector sales and revenues. It also reduces the flow of household savings into bank deposits in the financial sector. As a result the business sector has an incentive to increase employment and output and perhaps to borrow from the financial sector to finance that expansion. Increased employment in the business sector increases incomes in the household sector and further increases household expenditure and savings. These inter-sector linkages and feedbacks produce a response in aggregate economy greater than the initial change
	</p>""", 
	user_id=1,         
	notebook_id=4,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )

    new_tag8 = Tag(name="study", user_id=1)
    new_tag1 = Tag(name="economics", user_id=1)
    new_tag1.notes.append(note1)
    new_tag8.notes.append(note1)
    db.session.add(note1)
    db.session.commit()

    note2 = Note(
	title="""<h1>
		Key Ideas
	</h1>""", 
	body="""<p> </p> <p>
    Individual economic decisions need not be world-changing events, or motivated by a search for profit. Microeconomics is also about how we choose to spend our time and money. There are quite a few options to choose from: Sleep, work, study, food, shelter, transportation, entertainment, recreation and so forth. Because both time and income are limited we cannot do all things all the time. Many choices are routine or are driven by necessity</p><p> </p> <p>
    A critical element in making choices is that there exists a scarcity of time, or income or productive resources. Decisions are invariably subject to limits or constraints, and it is these constraints that make decisions both challenging and scientific.</p><p> </p> <p>
    Markets play a key role in coordinating the choices of individuals with the decisions of business. In modern market economies goods and services are supplied by both business and government. Hence we call them mixed economies. Some products or services are available through the marketplace to those who wish to buy them and have the necessary income—as in cases like coffee and wireless services. Other services are provided to all people through government programs like law enforcement and health care.</p><p> </p> <p>
    The market also allows for specialization and separation between production and use. Rather than each individual growing her own food, for example, she can sell her time or labour to employers in return for income. That income can then support her desired purchases. If businesses can produce food more cheaply than individuals the individual obviously gains from using the market – by both having the food to consume, and additional income with which to buy other goods and services. Economics seeks to explain how markets and specialization might yield such gains for individuals and society
	</p>""", 
	user_id=1,         
	notebook_id=4,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )
    new_tag1.notes.append(note2)
    new_tag8.notes.append(note2)
    db.session.add(note2)
    db.session.commit()

    note3 = Note(
	title="""<h1>Models</h1>""", body="""<p> </p> <p>
    In short, models are frameworks we use to organize how we think about a problem. Economists sometimes interchange the terms theories and models, though they are conceptually distinct. A theory is a logical view of how things work, and is frequently formulated on the basis of observation. A model is a formalization of the essential elements of a theory, and has the characteristics we described above.</p><p> </p> <p>
    A corresponding model might specify that wealth, income, and household size determine its expenditures, while it might ignore other, less important, traits such as the household’s neighbourhood or its religious beliefs. The model reduces and simplifies the theory to manageable dimensions. From such a reduced picture of reality we develop an analysis of how an economy and its components work.</p><p> </p> <p>
    Individuals face choices at every turn: In deciding to go to the hockey game tonight, you may have to forgo a concert; or you will have to forgo some leisure time this week in order to earn additional income for the hockey game ticket. Indeed, there is no such thing as a free lunch, a free hockey game or a free concert. In economics we say that these limits or constraints reflect opportunity cost. The opportunity cost of a choice is what must be sacrificed when a choice is made. That cost may be financial; it may be measured in time, or simply the alternative foregone</p><p> </p> <p>
    In the preceding example we have shown that specialization provides scope for gains that can accrue to those participating in the exchange. But this tells us little about how a market for these products comes into being: how does the exchange take place, and how is information transmitted? The answer is that while some markets have evolved historically to their current state, many markets are designed by an institution or a firm. Fruit and vegetable markets have been with us for thousands of years - since we ceased being purely a hunter-gatherer society. They exist in every community in the world economy.
	</p>""", user_id=1, notebook_id=4, created_on=datetime.datetime.now(), updated_on=datetime.datetime.now())
    
    new_tag1.notes.append(note3)
    db.session.add(note3)
    db.session.commit()

    note4 = Note(
	title="""<h1>
		Data Analysis
	</h1>""", 
	body="""<p> </p> <p>
    Data analysis, even without being motivated by economic theory, frequently displays patterns of behaviour that merit examination. The terms variables and data are related. Variables are measures that can take on different magnitudes. The interest rate on a student loan, for example, is a variable with a certain value at a point in time but perhaps a different value at an earlier or later date. Economic theories and models explain the causal relationships between variables. In contrast, Data are the recorded values of variables. Sets of data provide specific values for the variables we want to study and analyze.</p><p> </p> <p>
    The observation is based on facts or data, but it need not have any economic content. The economist’s task is to distinguish between coincidence and economic causation. Merely because variables are associated or correlated does not mean that one causes the other.</p><p> </p> <p>
    When the unit of observation is the same over time such repeated cross sections are called longitudinal data. For example, a health survey that followed and interviewed the same individuals over time would yield longitudinal data. If the individuals differ each time the survey is conducted, the data are repeated cross sections. Longitudinal data therefore follow the same units of observation through time.</p><p> </p> <p>
    Most variables in economics are averages of the components that go into them. When variables are denominated in dollar terms it is important to be able to interpret them correctly. While the house price series above indicates a strong pattern of price increases, it is vital to know if the price of housing increased more or less rapidly that other prices in the economy. If all prices in the economy were increasing in line with house prices there would be no special information in the house price series.
	</p>""", 
	user_id=1,         
	notebook_id=4,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )
    new_tag4 = Tag(name="data", user_id=1)
    new_tag4.notes.append(note4)
    db.session.add(note4)
    db.session.commit()

    note5 = Note(
	title="""<h1>
		Ethics
	</h1>""", 
	body="""<p> </p> <p>
    Positive economics studies objective or scientific explanations of how the economy functions. Its aim is to understand and generate predictions about how the economy may respond to changes and policy initiatives. In this effort economists strive to act as detached scientists, regardless of political sympathies or ethical code.</p><p> </p> <p>
    Equity is driven primarily by normative considerations. Few economists would disagree with the assertion that a government should implement policies that improve the lot of the poor—but to what degree?</p><p> </p> <p>
    If economics is concerned about the betterment of society, clearly there are ethical as well as efficiency considerations at play. And given the philosophical differences among scientists (including economists), can we define an approach to economics that is shared by the economics profession at large? Most economists would answer that the profession shares a set of beliefs, and that differences refer to the extent to which one consideration may collide with another.
	</p>""", 
	user_id=1,         
	notebook_id=4,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )
    new_tag5 = Tag(name="ethics", user_id=1)
    new_tag5.notes.append(note5)
    db.session.add(note5)
    db.session.commit()

    note6 = Note(
	title="""<h1>
		Key Concepts
	</h1>""", 
	body="""<p> </p> <p><ul>
			<li>Data: recorded values of variables</li>
			<li>Time series data: a set of measurements made sequentially at different points in time.</li>
			<li>Regression line: representation of the average relationship between two variables in a scatter diagram.</li>
			<li>Percentage change= (change in values)/original value×100.</li>
			<li>Economic equity is concerned with the distribution of well-being among members of the economy.</li>
			<li>Positive economics studies objective or scientific explanations of how the economy functions.</li>
			<li>Longitudinal data follow the same units of observation through time.</li>
			<li>Consumer price index: the average price level for consumer goods and services.</li>
		</ul></p>""", 
	user_id=1,         
	notebook_id=4,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )
    new_tag6 = Tag(name="list", user_id=1)
    new_tag6.notes.append(note6)
    new_tag8.notes.append(note6)
    db.session.add(note6)
    db.session.commit()



    note18 = Note(
	title="""<h1>
		To-Do
	</h1>""", 
	body="""<p> </p> <p>
		<ul>
			<li>Wash dog</li>
			<li>Got to store</li>
			<li>Make dinner</li>
			<li>Make bed</li>
			<li>Take out garbage</li>
			<li>Call doctor</li>
			<li>Laundry</li>
			<li>Wash the dishes</li>
			<li>Study</li>
		</ul>
	</p>""", 
	user_id=1,         
	notebook_id=3,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )
    new_tag6.notes.append(note18)
    db.session.add(note18)
    db.session.commit()

    note19 = Note(
	title="""<h1>
		Buy
	</h1>""", 
	body="""<p> </p> <p>
		<ul>
			<li>Bread</li>
			<li>Milk</li>
			<li>Eggs</li>
			<li>Chicken</li>
			<li>Potatos</li>
			<li>Shampoo</li>
			<li>Conditioner</li>
			<li>Lettuce</li>
			<li>Tomatoes</li>
			<li>Butter</li>
			<li>Cheese</li>
			<li>Tortilla wraps</li>
			<li>Paper towels</li>
			<li>Detergent</li>
		</ul>
	</p>""", 
	user_id=1,         
	notebook_id=3,  
	created_on=datetime.
	datetime.now(),
	updated_on=datetime.datetime.now()
    )
    new_tag6.notes.append(note19)
    db.session.add(note19)
    db.session.commit()


def undo_note_tags():
    db.session.execute('TRUNCATE note_tags RESTART IDENTITY CASCADE;')
    db.session.commit()
