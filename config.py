import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    @staticmethod
    def init_app(app):
        pass

    """基本配置"""


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data-test.sqlite')
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
